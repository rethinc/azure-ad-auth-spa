#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
# set -o xtrace # for debugging

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

main() {
  "${dir}/build-image.sh"
  docker run -d --rm -p 80:80 myauthtest.azurecr.io/web:latest
}

main "$@"
