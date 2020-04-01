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
  "success": true,
  "errorMsg": "", // it might be "Wrong username or password" in case of failure
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJpby5yb3NzaSIsImlhdCI6MTUxNjIzOTAyMiwicm9sZXMiOlsiZG9jdG9yIl19.u77tWJnNskPxa4cGuBikY6ebFEpflC2_XGwDvZFiukY", // secret is "mysecret"
  "username": "mario.rossi",
  "roles": [ "doctor" ], // it is a set of { "doctor", "manager" }
  "group": "Catania" // the group the user belongs to
}
```

### Authorization

The action can be executed by an anonymous user.

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

### Authorization

The logged user must have `doctor` privileges.

### Notes

The list of valid roles is [here](roles.md).

## Action: `api/newPositiveUpdate`

This action allows to append an update to a positive case.

### Request

```jsonc
{
  "caseNumber": 1234,
  "estremiProvvedimentiASL": "abcd efgh yxzk", // required field
  "diseaseConfirmDate": "2020-05-05T00:00:00.000Z", // required field
  "quarantinePlace": "HOME", // value in [ "HOME", "HOSP", "INTCARE" ] // required field
  "expectedWorkReturnDate": "2020-12-31T00:00:00.000Z", // nullable date
  "actualWorkReturnDate": null // nullable date
}
```

### Response

The response is empty.

### Authorization

The logged user must have `doctor` privileges.

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

### Authorization

The logged user must have `doctor` privileges.

## Action: `api/newSuspectUpdate`

This action allows to append an update to a suspect infected individual.

### Request

```jsonc
{
  "caseNumber": 1234,
  "quarantinePlace": "HOME", // value in [ "HOME", "HOSP" ]
  "expectedWorkReturnDate": "2020-12-31Z",
  "actualWorkReturnDate": null, // nullable date
  "healthMeasure": {
    "code": "12345",
    "by": "DOC" // can be in [ "DOC", "ASL" ]
  }
}
```

### Response

The response is empty.

### Authorization

The logged user must have `doctor` privileges.

## Action: `api/patientSheet`

This action allows to fetch updated patient data.

### Request

```jsonc
{
  "group": "Catania",
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
      "actualWorkReturnDate": null
    },
    "history": [
        {
            "quarantinePlace": "HOME",
            "expectedWorkReturnDate": "2020-12-31Z",
            "updatedAt": "2020-03-31T18:31:24.287Z",
            "updatedBy": "mario.rossi",
        },
        // ... other items here
    ]
}
```

### Authorization

The logged user must belong to `doctor` or `supervisor` role. He can access sheets belonging to his group only. In case the user has no groups, he can access sheets belonging to any group.

## Action: `api/suspectSheet`

This action allows to fetch updated suspect data.

### Request

```jsonc
{
  "group": "Catania",
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

### Authorization

The logged user must belong to `doctor` or `supervisor` role. He can access sheets belonging to his group only. In case the user has no groups, he can access sheets belonging to any group.

## Action: `api/statistics`

This action allows to fetch statistics on sheets.

### Request

The request is empty.

### Response

```jsonc
{
    groupStatistics: [
        {
            "group": "Group 1",
            "positives": {
                "totalSick": 3,
                "totalClosed": 3,
                "quarantinePlacesFacet": {
                    "HOME": 2,
                    "HOSP": 1,
                    "INTCARE": 0
                },
                "roleFacet": [
                    {
                      "name": "Role 1",
                      "total": 1
                    },
                    {
                      "name": "Role 2",
                      "total": 0
                    },
                    
                    // ...
                    
                    {
                      "name": "Role N",
                      "total": 2
                    },
                ],
            },
            "suspects": {
                "total": 12,
                "totalClosed": 21,
                "quarantinePlacesFacet": {
                    "HOME": 10,
                    "HOSP": 1,
                },
                "roleFacet": [
                    {
                      "name": "Role 1",
                      "total": 5
                    },
                    {
                      "name": "Role 2",
                      "total": 3
                    },
                    
                    // ...
                    
                    {
                      "name": "Role N",
                      "total": 1
                    },
                ],
            },
            ...
        },
        {
            "group": "Group 2",
            ...
        },
    ]
}
```

### Authorization

The logged user must have `manager` privileges.

## Action: `api/sheetCounters`

This action allows to fetch sheets counters.

### Request

The request is empty.

### Response

```jsonc
{
    counters: {
        positives: {
            closed: 200,
            open: 121
        },
        suspects: {
            closed: 800,
            open: 226
        }
    }
}
```

### Authorization

The user must be authenticated.

### Notes

The numbers refer to the group of the authenticated user. In case of empty group, the numbers refer to all the sheets.

## Action: `api/changePassword`

This action allows a user to change the password.

### Request

```jsonc
{
  "username": "mario.rossi",
  "oldPassword": "hereTheOldPassword12345",
  "newPassword": "hereTheNewPassword12345"
}
```

### Response

In case of success, the response is empty.

In case of failure the system returns an error in the following form:

```jsonc
{
  "error": "Password must contain at least 6 characters.\r\nThe new password must contain at least one digit.\r\nThe new password must contain at least one letter."
}
```

### Validation

In case the password is changed by a user belonging to `admin` role, validation is not performed. Otherwise, the password must:

* contain at least 6 characters;
* contain at least one number;
* contain at least one letter.

### Authorization

The action can be executed by an authenticated user with reference to his own password. 

The action can be executed in any case by a user belonging to `admin` role, with reference to the password belonging to any user.

## Action: `api/groups`

This action returns the groups visible by the authenticated user.

### Request

The request is empty.

### Response

```jsonc
{
  groups: [
    {
        "code": "theGroup",
        "description": "the Description"
    },
    // ... here the other groups
  ]
}
```

### Authorization

The action can be executed by authenticated users.

### Notes

The group description is get from the group code converting to uppercase characters.

## Action: `api/news`

This action returns the current news to display to the users.

### Request (GET)

The request is empty.

### Response

```jsonc
{
  news: [
    {
        highlight: false, // [true|false]
        text: "here the news text in HTML format...",
        order: 230 // integer value
    },
    // ... other news here
  ]
}
```

### Authorization

The action can be executed by any authenticated user.

### Notes

The action returns the news ordered by `order` fields in descending order.

## Action: `api/sheets`

This action returns the patients and suspects sheets.

### Request

```jsonc
{
  "group": "theGroup"
}
```

### Response

```jsonc
{
  patients: [
    {
        "group": "theGroup",
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
          "quarantinePlace": "HOME", // value in [ "HOME", "HOSP", "INTCARE" ]
          "expectedWorkReturnDate": "2020-12-31Z",
          "actualWorkReturnDate": null // nullable date
        }
    },
    // ... other patients here
  ],
  suspects: [
    {
        "group": "theGroup",
        "subject": {
          "number": 1234,
          "name": "Giuseppe",
          "surname": "Verdi",
          "email": "giuseppe.verdi@vigilfuoco.it",
          "phone": "3337654321",
          "role": "ASSISTENTE AMMINISTRATIVO"
        },
        "data": {
          "quarantinePlace": "HOME", // value in [ "HOME", "HOSP" ]
          "expectedWorkReturnDate": "2020-12-31Z",
          "actualWorkReturnDate": null, // nullable date
          "healthMeasure": {
            code: "12345",
            by: "DOC" // can be in [ "DOC", "ASL" ]
          }
        }
    },
    // ... other suspects here
  ]
}
```

### Authorization

The action can be executed by any authenticated user with reference to his groups. A user belonging to no groups is allowed to retrieve sheets belonging to any group.

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