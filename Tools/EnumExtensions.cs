using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace Sklep.Tools
{
    public static class EnumExtensions
    {
        public static string GetDisplayName(this Enum enumValue)
        {
            var enumDisplay = enumValue.GetType().GetMember(enumValue.ToString()).First()
              .GetCustomAttribute<DisplayAttribute>();

            return enumDisplay != null ? enumDisplay.GetName() : enumValue.ToString();
        }
    }
}
