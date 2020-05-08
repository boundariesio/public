objects=zcta5 county place state
tiger_url=ftp://ftp2.census.gov/geo/tiger/TIGER2019

zcta5: zcta5.geo.json
	$(call importAndIndex,us,postalcode,GEOID10,GEOID10)

county: county.geo.json
	$(call importAndIndex,us,county,GEOID,NAME)

place: place.geo.json
	$(call importAndIndex,us,place,GEOID,NAME)

state: state.geo.json
	$(call importAndIndex,us,state,GEOID,NAME)

%.geo.json: %.zip
	ogr2ogr -t_srs crs:84 -f "GeoJSON" /vsistdout/ /vsizip/$< | \
		./prepare 'features.*' $* > $@.tmp
	mv $@.tmp $@ && rm $<

%.zip: %.manifest
	curl $(shell head -n 1 $<) -o $@.download
	mv $@.download $@ && rm $<

%.manifest:
	$(eval url := $(tiger_url)/$(shell echo $* | tr -s '[:lower:]' '[:upper:]')/)
	curl -l $(url) | \
		sort -nr | \
		sed 's,^,$(url),' > $*.tmp
	test -s ./$*.tmp && mv $*.tmp $@

clean:
	rm -rf *.geo.json *.zip *.manifest

define importAndIndex
	@mongo $(MONGO_URL) --eval "db.$1.ensureIndex({geometry: '2dsphere'}).note"
	@mongo $(MONGO_URL) --eval "db.$1.ensureIndex({'properties.$4': 'text'}).note"
	@mongoimport \
		--uri $(MONGO_URL) \
		--upsert \
		--jsonArray \
		--upsertFields="properties.$3" \
		--collection $1 \
		< ./$<
endef

# @TODO compound index for type + 2dsphere

.PRECIOUS: %.zip %.geo.json %.manifest
.INTERMEDIATE: %.tmp

.PHONY: clean $(objects) image
