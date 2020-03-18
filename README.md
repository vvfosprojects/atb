# REST interface

## Action: `api/auth`

This action allows to authenticate to the system.

### Request

```jsonc
{
  "username": "mario.rossi",
  "password": "hereThePassword"
}
```

### Response

```jsonc
{
  "result": "failure", // [success|failure]
  "errorMsg": "Wrong username or password" // empty in case of success,
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJpby5yb3NzaSIsImlhdCI6MTUxNjIzOTAyMiwicm9sZXMiOlsiZG9jdG9yIl19.u77tWJnNskPxa4cGuBikY6ebFEpflC2_XGwDvZFiukY", // secret is "mysecret"
  "roles": [ "doctor" ], // it is a set of { "doctor", "manager" }
  "group": "Catania" // the group the user belongs to
}
```

## Action: `api/newPositiveCase`

This action allows to insert a new positive case.

### Request

```jsonc
{
  "number": 1234,
  "name": "Mario",
  "surname": "Rossi",
  "email": "mario.rossi@vigilfuoco.it",
  "phone": "3331234567",
  "role": "VIGILE DEL FUOCO"
}
```

### Response

The response is empty.

### Notes

The list of valid roles is [here](roles.md).

## Action: `api/newPositiveUpdate`

This action allows to append an update to a positive case.

### Request

```jsonc
{
  "caseNumber": 1234,
  "estremiProvvedimentiASL": "abcd efgh yxzk",
  "quarantinePlace": "HOME", // value in [ "HOME", "HOSP", "INTCARE" ]
  "expectedWorkReturnDate": "2020-12-31Z",
  "actualWorkReturnDate": null, // nullable date
  "closedCase": true // boolean
}
```

### Response

The response is empty.

## Action: `api/newSuspect`

This action allows to insert a new suspected infected individual.

### Request

```jsonc
{
  "number": 1234,
  "name": "Mario",
  "surname": "Rossi",
  "email": "mario.rossi@vigilfuoco.it",
  "phone": "3331234567",
  "role": "VIGILE DEL FUOCO"
}
```

### Response

The response is empty.

### Notes

The list of valid roles is [here](roles.md).

## Action: `api/newSuspectUpdate`

This action allows to append an update to a suspect infected individual.

### Request

```jsonc
{
  "caseNumber": 1234,
  "quarantinePlace": "HOME", // value in [ "HOME", "HOSP" ]
  "expectedWorkReturnDate": "2020-12-31Z",
  "actualWorkReturnDate": null, // nullable date
  "closedCase": true // boolean
}
```

### Response

The response is empty.

## Action: `api/patientSheet`

This action allows to fetch updated patient data.

### Request

```jsonc
{
  "caseNumber": 1234
}
```

### Response

```jsonc
{
    "subject": {
      "number": 1234,
      "name": "Mario",
      "surname": "Rossi",
      "email": "mario.rossi@vigilfuoco.it",
      "phone": "3331234567",
      "role": "VIGILE DEL FUOCO"
    },
    "data": {
      "estremiProvvedimentiASL": "abcd efgh yxzk",
      "quarantinePlace": "HOME",
      "expectedWorkReturnDate": "2020-12-31Z",
      "actualWorkReturnDate": null,
      "closedCase": true
    }
}
```

## Action: `api/suspectSheet`

This action allows to fetch updated suspect data.

### Request

```jsonc
{
  "caseNumber": 1234
}
```

### Response

```jsonc
{
    "subject": {
      "number": 1234,
      "name": "Mario",
      "surname": "Rossi",
      "email": "mario.rossi@vigilfuoco.it",
      "phone": "3331234567",
      "role": "VIGILE DEL FUOCO"
    },
    "data": {
      "quarantinePlace": "HOME",
      "expectedWorkReturnDate": "2020-12-31Z",
      "actualWorkReturnDate": null,
      "closedCase": true
    }
}
```

# Database collections

## `patients` collection

```jsonc
{
  "group": "CATANIA", // this is the name of the group the patient belongs to
  "data": {
    "number": 1234,
    "name": "Mario", // this field is stored encrypted
    "surname": "Rossi", // this field is stored encrypted
    "email": "mario.rossi@vigilfuoco.it", // this field is stored encrypted
    "phone": "3331234567", // this field is stored encrypted
    "role": "VIGILE DEL FUOCO" // this field is stored encrypted
  },
  updates: [
    {
      "estremiProvvedimentiASL": "abcd efgh yxzk",
      "quarantinePlace": "HOME",
      "expectedWorkReturnDate": "2020-12-31Z",
      "actualWorkReturnDate": null,
      "closedCase": false,
      "updateTime": "2020-04-01T23:12:44.332Z",
      "updatedBy": "giovanni.bianchi"
    },
    {
      "estremiProvvedimentiASL": "yxzk efgh abcd",
      "quarantinePlace": "HOSP",
      "expectedWorkReturnDate": "2020-12-31Z",
      "actualWorkReturnDate": "2020-12-30Z",
      "closedCase": true,
      "updateTime": "2020-04-02T21:50:12.731Z",
      "updatedBy": "giovanni.bianchi"
    },
    // ... and so on
  ]
}
```

### Notes

The SHA-256 and field encryption can be implemented with the code available [HERE](cryptography.md).

## `suspects` collection

```jsonc
{
  "group": "CATANIA", // this is the name of the group the patient belongs to
  "data": {
    "number": 1234,
    "name": "Mario", // this field is stored encrypted
    "surname": "Rossi", // this field is stored encrypted
    "email": "mario.rossi@vigilfuoco.it", // this field is stored encrypted
    "phone": "3331234567", // this field is stored encrypted
    "role": "VIGILE DEL FUOCO" // this field is stored encrypted
  },
  updates: [
    {
      "quarantinePlace": "HOME", // value in [ "HOME", "HOSP" ]
      "expectedWorkReturnDate": "2020-12-31Z",
      "actualWorkReturnDate": null, // nullable date
      "closedCase": true, // boolean
      "updateTime": "2020-04-01T23:12:44.332Z",
      "updatedBy": "giovanni.bianchi"
    },
    {
      "quarantinePlace": "HOME", // value in [ "HOME", "HOSP" ]
      "expectedWorkReturnDate": "2020-12-31Z",
      "actualWorkReturnDate": null, // nullable date
      "closedCase": true, // boolean
      "updateTime": "2020-04-02T21:50:12.731Z",
      "updatedBy": "giovanni.bianchi"
    },
    // ... and so on
  ]
}
```

## `doctors` collection

```jsonc
{
  "username": "mario.rossi",
  "pwdHash": "6adc35089eb05a42a7d877259075158d99dc9e043c3c1ef7acd6ae52166a4663", // sha-256 password hash
  "group": "CATANIA", // this is the name of the group assigned to the doctor
  "enabled": true // false if the account is deactivated
}
```