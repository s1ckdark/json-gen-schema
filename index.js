(function () {
  function isPlainObject(obj) {
    return obj ? typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype : false;
  }

  const supportType = ['string', 'number', 'array', 'object', 'boolean', 'integer'];

  function getType(type) {
    if (!type) type = 'string';
    if (supportType.indexOf(type) !== -1) {
      return type;
    }
    return typeof type;
  }

  function isSchema(object) {
    if (supportType.indexOf(object.bsonType) !== -1) {
      return true;
    }
    return false;
  }

  function handleSchema(json, schema) {
    Object.assign(schema, json);
    if (schema.bsonType === 'object') {
      delete schema.properties;
      parse(json.properties, schema);
    }
    if (schema.bsonType === 'array') {
      delete schema.items;
      schema.items = {};
      parse(json.items, schema.items)
    }

  }

  function handleArray(arr, schema) {
    schema.bsonType = 'array';
    var props = schema.items = {};
    parse(arr[0], props)
  }

  function handleObject(json, schema) {
    if (isSchema(json)) {
      return handleSchema(json, schema)
    }
    schema.bsonType = 'object';
    schema.required = [];
    var props = schema.properties = {};
    for (var key in json) {
      var item = json[key];
      var curSchema = props[key] = {};
      if (key[0] === '*') {
        delete props[key];
        key = key.substr(1);
        schema.required.push(key);
        curSchema = props[key] = {};

      }
      parse(item, curSchema)
    }
  }

  function parse(json, schema) {
    if (Array.isArray(json)) {
      handleArray(json, schema)
    } else if (isPlainObject(json)) {
      handleObject(json, schema)
    } else {
      schema.bsonType = getType(json)
    }
  }

  function ejs(data) {
    var JsonSchema = {validator:{$jsonSchema:{}}};
    parse(data, JsonSchema.validator.$jsonSchema);
    return JsonSchema;
  }

  if(typeof module !== 'undefined' && typeof module === 'object' && module.exports !== 'undefined'){
    module.exports = ejs;
  }

  if(typeof window !== 'undefined' && typeof window === 'object'){
    window.easyJsonSchema = ejs;
  }
  
})()