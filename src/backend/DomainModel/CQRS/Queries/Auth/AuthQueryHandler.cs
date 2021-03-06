﻿using CQRS.Commands;
using CQRS.Queries;
using DomainModel.Services;
using DomainModel.Services.Users;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DomainModel.CQRS.Queries.Auth
{
    public class AuthQueryHandler : IQueryHandler<AuthQuery, AuthQueryResult>
    {
        private readonly IGetUserByUsername getUserByUsername;

        public AuthQueryHandler(IGetUserByUsername getUserByUsername)
        {
            this.getUserByUsername = getUserByUsername ?? throw new ArgumentNullException(nameof(getUserByUsername));
        }

        public AuthQueryResult Handle(AuthQuery query)
        {
            try
            {
                var user = this.getUserByUsername.Get(query.Username);

                if (user != null && user.PwdHash == ShaGenerator.ComputeSha256Hash(query.Password))
                    return new AuthQueryResult()
                    {
                        Success = true,
                        Username = user.Username,
                        Group = user.Group,
                        Roles = user.Roles.ToArray(),
                    };

                Log.Information($"Authentication failed. Username: { query.Username }");
                return new AuthQueryResult()
                {
                    Success = false,
                    Username = string.Empty,
                    Group = string.Empty,
                    Roles = new string[0]
                };
            }
            catch
            {
                return new AuthQueryResult()
                {
                    Success = false,
                    Username = string.Empty,
                    Group = string.Empty,
                    Roles = new string[0]
                };
            }
        }
    }
}