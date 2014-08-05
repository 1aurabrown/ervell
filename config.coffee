#
# Using ["The Twelve-Factor App"](http://12factor.net/) as a reference all
# environment configuration will live in environment variables. This file
# simply lays out all of those environment variables with sensible defaults
# for development.
#

module.exports =

  NODE_ENV: "development"
  PORT: 4000
  API_URL: "http://localhost:3000/v3"
  #API_URL: "http://api.are.na/v2"

# Override any values with env variables if they exist
module.exports[key] = (process.env[key] or val) for key, val of module.exports
