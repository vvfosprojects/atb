﻿using DomainModel.Services;
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

            if (key.Length < 32)
            {
                throw new System.ArgumentException("key must be at least 32 chars long", nameof(key));
            }

            this.key = key.Substring(0, 32);
        }

        public string Decrypt(string s)
        {
            if (string.IsNullOrWhiteSpace(s))
                return s;

            return EncryptProvider.AESDecrypt(s, key);
        }

        public string Encrypt(string s)
        {
            if (string.IsNullOrWhiteSpace(s))
                return s;

            return EncryptProvider.AESEncrypt(s, key);
        }
    }
}