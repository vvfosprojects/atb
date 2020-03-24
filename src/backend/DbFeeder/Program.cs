﻿using Bogus;
using DomainModel.Classes;
using Persistence.InMongo_local;
using System;
using System.Collections.Generic;

namespace DbFeeder
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var roles = new List<string>()
            {
                        "PILOTA DI AEROMOBILE CAPO REPARTO",
        "PILOTA DI AEROMOBILE CAPO SQUADRA",
        "PILOTA DI AEROMOBILE CAPO SQUADRA ESPERTO",
        "PILOTA DI AEROMOBILE ISPETTORE",
        "PILOTA DI AEROMOBILE ISPETTORE COORDINATORE",
        "PILOTA DI AEROMOBILE ISPETTORE ESPERTO",
        "PILOTA DI AEROMOBILE VIGILE DEL FUOCO",
        "PILOTA DI AEROMOBILE VIGILE DEL FUOCO COORDINATORE",
        "PILOTA DI AEROMOBILE VIGILE DEL FUOCO ESPERTO",
        "SOMMOZZATORE CAPO REPARTO",
        "SOMMOZZATORE CAPO SQUADRA",
        "SOMMOZZATORE CAPO SQUADRA ESPERTO",
        "SOMMOZZATORE ISPETTORE",
        "SOMMOZZATORE ISPETTORE COORDINATORE",
        "SOMMOZZATORE ISPETTORE ESPERTO",
        "SOMMOZZATORE VIGILE DEL FUOCO",
        "SOMMOZZATORE VIGILE DEL FUOCO COORDINATORE",
        "SOMMOZZATORE VIGILE DEL FUOCO ESPERTO",
        "VIGILE DEL FUOCO",
        "VIGILE DEL FUOCO COORDINATORE",
        "VIGILE DEL FUOCO ESPERTO",
        "VIGILE DEL FUOCO AIB",
        "VIGILE DEL FUOCO COORDINATORE AIB",
        "VIGILE DEL FUOCO ESPERTO AIB",
        "MAESTRO DIRETTORE",
        "DIRETTORE GINNICO-SPORTIVO-VICEDIRIGENTE",
        "DIRETTORE MEDICO-VICEDIRIGENTE",
        "DIRIGENTE SUPERIORE GINNICO-SPORTIVO",
        "PRIMO DIRIGENTE GINNICO-SPORTIVO",
        "DIRIGENTE SUPERIORE MEDICO",
        "PRIMO DIRIGENTE MEDICO"
            };

            var province = new List<string>()
            {
               "Roma",
               "Rieti",
               "Latina",
               "Terni",
               "Frosinone",
               "Napoli",
               "Caserta",
               "Benevento",
               "Salerno",
               "Avellino"
            };

            var positiveAnaFaker = new Faker<Anagrafica>("it")
                .StrictMode(true)
                .RuleFor(a => a.Number, f => f.IndexVariable++ + 1)
                .RuleFor(a => a.Nome, f => f.Name.FirstName())
                .RuleFor(a => a.Cognome, f => f.Name.LastName())
                .RuleFor(a => a.Email, f => f.Internet.Email())
                .RuleFor(a => a.Phone, f => f.Phone.PhoneNumber())
                .RuleFor(a => a.Role, f => f.PickRandom(roles));

            var dataFaker = new Faker<PositiveData>("it")
                .StrictMode(true)
                .RuleFor(a => a.EstremiProvvedimentiASL, f => "Prov. n. " + f.Random.Number(1000, 9999) + " del " + f.Date.Recent(38).ToString("dd/MM/yyyy"))
                .RuleFor(a => a.QuarantinePlace, f => f.PickRandom(new[] { "HOME", "HOSP", "INTCARE" }))
                .RuleFor(a => a.DiseaseConfirmDate, f => f.Date.Recent(38))
                .RuleFor(a => a.ExpectedWorkReturnDate, f => f.Random.Float() < .6f ? f.Date.Future(40) : (DateTime?)null)
                .RuleFor(a => a.ActualWorkReturnDate, f => f.Random.Float() < .6f ? f.Date.Future(40) : (DateTime?)null)
                .RuleFor(a => a.UpdateTime, f => f.Date.Recent(15))
                .RuleFor(a => a.UpdatedBy, f => f.Internet.UserName());

            var positiveFaker = new Faker<Patient>()
                .StrictMode(true)
                .Ignore(p => p.Id)
                .RuleFor(p => p.Subject, f => positiveAnaFaker.Generate())
                .RuleFor(p => p.Data, f => dataFaker.Generate(1))
                .RuleFor(p => p.Group, f => f.PickRandom(province));

            var suspectAnaFaker = new Faker<Anagrafica>("it")
                .StrictMode(true)
                .RuleFor(a => a.Number, f => f.IndexVariable++ + 1)
                .RuleFor(a => a.Nome, f => f.Name.FirstName())
                .RuleFor(a => a.Cognome, f => f.Name.LastName())
                .RuleFor(a => a.Email, f => f.Internet.Email())
                .RuleFor(a => a.Phone, f => f.Phone.PhoneNumber())
                .RuleFor(a => a.Role, f => f.PickRandom(roles));

            var healthMeasureFaker = new Faker<HealthMeasure>("it")
                .StrictMode(true)
                .RuleFor(a => a.Code, f => f.Random.Number(1000, 9999).ToString())
                .RuleFor(a => a.By, f => f.PickRandom(new[] { "ASL", "DOC" }));

            var data2Faker = new Faker<SuspectData>()
                .StrictMode(true)
                .RuleFor(a => a.QuarantinePlace, f => f.PickRandom(new[] { "HOME", "HOSP" }))
                .RuleFor(a => a.ExpectedWorkReturnDate, f => f.Date.Future(40))
                .RuleFor(a => a.ActualWorkReturnDate, f => f.Random.Float() < .6f ? f.Date.Future(40) : (DateTime?)null)
                .RuleFor(a => a.HealthMeasure, f => healthMeasureFaker.Generate())
                .RuleFor(a => a.UpdateTime, f => f.Date.Recent(15))
                .RuleFor(a => a.UpdatedBy, f => f.Internet.UserName());

            var suspectFaker = new Faker<Suspect>()
                .StrictMode(true)
                .Ignore(p => p.Id)
                .RuleFor(p => p.Subject, f => suspectAnaFaker.Generate())
                .RuleFor(p => p.Data, f => data2Faker.Generate(1))
                .RuleFor(p => p.Group, f => f.PickRandom(province));

            var dbContext = new DbContext("mongodb://localhost:27017", "ATB");
            var patients = positiveFaker.Generate(1000);
            var suspects = suspectFaker.Generate(1000);
            dbContext.Patients.InsertMany(patients);
            dbContext.Suspects.InsertMany(suspects);

            Console.WriteLine("Hello World!");
        }
    }
}