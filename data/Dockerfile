FROM osgeo/gdal:ubuntu-small-latest

RUN apt-get install -y curl gnupg jq

RUN curl -LSs https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add -

RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get install -y \
  make \
  gcc \
  g++ \
  curl \
  git \
  unzip \
  zlib1g-dev \
  nodejs \
  mongodb-org-shell \
  mongodb-org-tools

WORKDIR /data

ADD package.json .

RUN npm install

COPY . .
