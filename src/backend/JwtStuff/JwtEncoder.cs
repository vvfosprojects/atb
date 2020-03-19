using DomainModel.Services;
using JWT.Algorithms;
using JWT.Builder;
using System;
using System.Collections.Generic;
using System.Text;

namespace JwtStuff
{
    internal class JwtEncoder : IJwtEncoder
    {
        private readonly string secret;
        private readonly string issuer;
        private readonly TimeSpan duration;

        public JwtEncoder(string secret,
            string issuer,
            TimeSpan duration)
        {
            if (string.IsNullOrWhiteSpace(secret))
            {
                throw new ArgumentException("secret cannot be empty", nameof(secret));
            }

            if (string.IsNullOrWhiteSpace(issuer))
            {
                throw new ArgumentException("issuer cannot be empty", nameof(issuer));
            }

            this.secret = secret;
            this.issuer = issuer;
            this.duration = duration;
        }

        public string Encode(string username, string group, string[] roles)
        {
            var token = new JwtBuilder()
              .WithAlgorithm(new HMACSHA256Algorithm())
              .WithSecret(this.secret)
              .Subject(username)
              .Issuer(this.issuer)
              .ExpirationTime(DateTime.UtcNow.Add(this.duration))
              .AddClaim("group", group)
              .AddClaim("roles", roles)
              .Encode();

            return token;
        }
    }
}