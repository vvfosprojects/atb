using DomainModel.Services;
using NETCore.Encrypt;

namespace CryptoStuff
{
    internal class Cryptools : ICryptools
    {
        private readonly string key;

        public Cryptools(string key)
        {
            if (string.IsNullOrWhiteSpace(key))
            {
                throw new System.ArgumentException("key cannot be null", nameof(key));
            }

            this.key = key;
        }

        public string Decrypt(string s)
        {
            return EncryptProvider.AESDecrypt(s, key);
        }

        public string Encrypt(string s)
        {
            return EncryptProvider.AESEncrypt(s, key);
        }
    }
}