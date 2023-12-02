using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;

namespace Sklep.Tools
{
    public static class ControllerTools
    {
        public static string ValidationMessage(this ModelStateDictionary modelState)
        {
            var errors = modelState.Select(x => x.Value.Errors)
                           .Where(x => x.Count > 0)
                           .SelectMany(x => x)
                           .Select(x => x.ErrorMessage)
                           .ToList();

            var errorString = string.Join(" ", errors).Replace(".", ",");
            errorString = errorString.Remove(errorString.Length - 1);   //remove last comma

            var translateResult = Translator.Translate(errorString, "pl");

            if (translateResult.Success)
                return translateResult.ResultValue;
            else
                return errorString;
        }
    }
}
