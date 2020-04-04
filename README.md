# #ATB

#ATB è l'applicativo sviluppato dal Corpo Nazionale dei Vigili del Fuoco per il tracciamento continuo del personale che ha contratto il virus COVID-19 o è in isolamento preventivo.

#ATB is developed by the Italian Fire Corps and allows to track COVID-19 patients and suspect employees subject to home isolation as a precautionary measure.

## Screenshots

![Login Page](./docs/images/ "Pagina di login")
![Doctor home page](./docs/images/ "Home page del medico")
![Positive sheet](./docs/images/ "Scheda paziente")
![Suspect sheet](./docs/images/ "Scheda sospetto")
![Subject list](./docs/images/ "Lista dei soggetti")
![Basic stats per type](./docs/images/ "Statistiche di base - per tipo soggetto")
![Basic stats per group](./docs/images/ "Statistiche di base - per sede di servizio")
![Advanced stats - The KPIs](./docs/images/ "Statistiche avanzate - Gli indicatori")
![Advanced stats - The raw data](./docs/images/ "Statistiche avanzate - I dati grezzi")

## Software architecture

Il software è costituito da:

* un modulo frontend sviluppato in Angular9;
* un modulo backend sviluppato in WebApi netcore 3.1;
* un database basato su MongoDB community edition.

* [REST interface](rest-interface.md)
* [DB schema](db-schema.md)