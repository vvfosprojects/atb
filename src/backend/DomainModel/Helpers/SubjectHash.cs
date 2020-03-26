using DomainModel.Classes;
using DomainModel.Services;
using System;

namespace DomainModel.Helpers
{
    public class SubjectHash
    {
        private readonly ICryptools cryptools;

        public SubjectHash(ICryptools cryptools)
        {
            this.cryptools = cryptools ?? throw new ArgumentNullException(nameof(cryptools));
        }

        public Patient PatientEncrypt(Patient patient)
        {
            patient.Subject.Nome = this.cryptools.Encrypt(patient.Subject.Nome);
            patient.Subject.Cognome = this.cryptools.Encrypt(patient.Subject.Cognome);
            patient.Subject.Phone = this.cryptools.Encrypt(patient.Subject.Phone);
            patient.Subject.Email = this.cryptools.Encrypt(patient.Subject.Email);
            patient.Subject.Role = this.cryptools.Encrypt(patient.Subject.Role);

            return patient;
        }

        public Patient PatientDecrypt(Patient patient)
        {
            patient.Subject.Nome = this.cryptools.Decrypt(patient.Subject.Nome);
            patient.Subject.Cognome = this.cryptools.Decrypt(patient.Subject.Cognome);
            patient.Subject.Phone = this.cryptools.Decrypt(patient.Subject.Phone);
            patient.Subject.Email = this.cryptools.Decrypt(patient.Subject.Email);
            patient.Subject.Role = this.cryptools.Decrypt(patient.Subject.Role);

            return patient;
        }

        public Suspect SuspectEncrypt(Suspect suspect)
        {
            suspect.Subject.Nome = this.cryptools.Encrypt(suspect.Subject.Nome);
            suspect.Subject.Cognome = this.cryptools.Encrypt(suspect.Subject.Cognome);
            suspect.Subject.Phone = this.cryptools.Encrypt(suspect.Subject.Phone);
            suspect.Subject.Email = this.cryptools.Encrypt(suspect.Subject.Email);
            suspect.Subject.Role = this.cryptools.Encrypt(suspect.Subject.Role);

            return suspect;
        }

        public Suspect SuspectDecrypt(Suspect suspect)
        {
            suspect.Subject.Nome = this.cryptools.Decrypt(suspect.Subject.Nome);
            suspect.Subject.Cognome = this.cryptools.Decrypt(suspect.Subject.Cognome);
            suspect.Subject.Phone = this.cryptools.Decrypt(suspect.Subject.Phone);
            suspect.Subject.Email = this.cryptools.Decrypt(suspect.Subject.Email);
            suspect.Subject.Role = this.cryptools.Decrypt(suspect.Subject.Role);

            return suspect;
        }
    }
}
