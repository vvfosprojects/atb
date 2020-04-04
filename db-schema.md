# Database collections

## `patients` collection

```jsonc
{
  "identifier": {
    "group": "CATANIA", // this is the name of the group the patient belongs to
    "number": 1234
  },
  "data": {
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
  "identifier": {
    "group": "CATANIA", // this is the name of the group the patient belongs to
    "number": 1234
  },
  "data": {
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

## `users` collection

```jsonc
{
  "username": "mario.rossi",
  "pwdHash": "6adc35089eb05a42a7d877259075158d99dc9e043c3c1ef7acd6ae52166a4663", // sha-256 password hash
  "group": "CATANIA", // this is the name of the group assigned to the doctor
  "enabled": true, // false if the account is deactivated
  "roles": [ "doctor" ], // it is a set of { "doctor", "manager" }
}
```

## `news` collection

```jsonc
{
    "highlight" : true, // true | false
    "text" : "Here the news text",
    "order" : 70, //integer value
    "validFrom": "2020-04-02T08:00:00.000Z", // the news appears in this instant
    "validTo": null // the news is valid forever
}
```

## `keep-alives` collection

```jsonc
{
    "group": "Catania",
    "at": "2020-04-02T12:29:14.772Z",
    "by": "giovanni.bianchi"
}
```