# json-gen-schema
Generate the json-gen-schema in any json-schema for mongodb validation.

## install
npm install json-gen-schema

## Usage
```
const jgs = require('json-gen-schema');
const jsonSchema = jgs(json);
console.log(jsonSchema);
```
## example

### Base 
Input:

```
{
  "id": "string",
  "*name": "string",
  "*email": "string",
  "arr": [{
    "site": "string",
    "url": "string"
  }]
}

```

Output:

```
{
  validator: {
    '$jsonSchema': {
      bsonType: 'object',
      required: [ 'name', 'email' ],
      properties: {
        id: { bsonType: 'string' },
        name: { bsonType: 'string' },
        email: { bsonType: 'string' },
        arr: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: [],
            properties: {
              site: { bsonType: 'string' },
              url: { bsonType: 'string' }
            }
          }
        }
      }
    }
  }
}

```

### Advance
Input:

```
{
  "*id": "string",
  "*name": {
    "type": "string",
    "enum": [
      "tom",
      "jay"
    ],
    "minLength": 1,
    "maxLength": 10
  },
  "*images": [
    {
      "*id": "number",
      "names": {
        "type": "array",
        "title": "Images Collections.",
        "items": {
          "*id": "string",
          "*name": "string"
        }
      }
    }
  ],
  "abc": {
    "a": {
      "x": "string",
      "y": {
        "type": "number",
        "minimum": 400000,
        "maximum": 900000
      }
    }
  }
}
```

Output:
```
{
  validator: {
    '$jsonSchema': {
      bsonType: 'object',
      required: [ 'id', 'name', 'images' ],
      properties: {
        id: { bsonType: 'string' },
        name: {
          bsonType: 'object',
          required: [],
          properties: {
            type: { bsonType: 'string' },
            enum: { bsonType: 'array', items: { bsonType: 'string' } },
            minLength: { bsonType: 'number' },
            maxLength: { bsonType: 'number' }
          }
        },
        images: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: [ 'id' ],
            properties: {
              id: { bsonType: 'number' },
              names: {
                bsonType: 'object',
                required: [],
                properties: {
                  type: { bsonType: 'array' },
                  title: { bsonType: 'string' },
                  items: {
                    bsonType: 'object',
                    required: [ 'id', 'name' ],
                    properties: {
                      id: { bsonType: 'string' },
                      name: { bsonType: 'string' }
                    }
                  }
                }
              }
            }
          }
        },
        abc: {
          bsonType: 'object',
          required: [],
          properties: {
            a: {
              bsonType: 'object',
              required: [],
              properties: {
                x: { bsonType: 'string' },
                y: {
                  bsonType: 'object',
                  required: [],
                  properties: {
                    type: { bsonType: 'number' },
                    minimum: { bsonType: 'number' },
                    maximum: { bsonType: 'number' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```
