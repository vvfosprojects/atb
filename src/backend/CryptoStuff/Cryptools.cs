using DomainModel.Services;
using Microsoft.AspNetCore.DataProtection;

namespace CryptoStuff
{
    internal class Cryptools : ICryptools
    {
        private readonly IDataProtector protector;
        private readonly string key;

        public Cryptools(IDataProtectionProvider dataProtectionProvider,
            string key)
        {
            if (string.IsNullOrWhiteSpace(key))
            {
                throw new System.ArgumentException("encryption key cannot be null", nameof(key));
            }

            protector = dataProtectionProvider.CreateProtector(key);
            this.key = key;
        }

        public string Encrypt(string input)
        {
            return protector.Protect(input);
        }

        public string Decrypt(string cipherText)
        {
            return protector.Unprotect(cipherText);
        }
    }
}