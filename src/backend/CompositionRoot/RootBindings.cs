using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using Microsoft.Extensions.Configuration;
using SimpleInjector;

namespace CompositionRoot
{
    /// <summary>
    /// This class represents the composition root and triggers all the
    /// bindings through helper classes
    /// </summary>
    public static class RootBindings
    {
        public static void Bind(Container container, IConfiguration configuration)
        {
            CQRSBindings.Bind(container);
            CustomBindings.Bind(container, configuration);
        }
    }
}