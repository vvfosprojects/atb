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
        private readonly TimeSpan duration;

        public JwtEncoder(string secret,
            TimeSpan duration)
        {
            if (string.IsNullOrWhiteSpace(secret))
            {
                throw new ArgumentException("secret cannot be empty", nameof(secret));
            }

            this.secret = secret;
            this.duration = duration;
        }

        public string Encode(string username, string group, string[] roles)
        {
            var token = new JwtBuilder()
              .WithAlgorithm(new HMACSHA256Algorithm())
              .WithSecret(this.secret)
              .AddClaim("username", username)
              .AddClaim("group", group)
              .AddClaim("roles", roles)
              .ExpirationTime(DateTime.UtcNow.Add(this.duration))
              .Encode();

            return token;
        }
    }
}