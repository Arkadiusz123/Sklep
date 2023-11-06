using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;
using System.Net;
using System.Web;

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

            try
            {
                var translated = Translate(errorString, "pl");
                return translated.Remove(translated.Length - 1);    //remove last comma
            }
            catch (System.Exception)
            {
                return errorString;
            }
        }

        public static string Translate(string text, string targetLanguage)
        {
            string url = $"https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl={targetLanguage}&dt=t&q={HttpUtility.UrlEncode(text)}";

            using (WebClient webClient = new WebClient())
            {
                string response = webClient.DownloadString(url);
                dynamic result = Newtonsoft.Json.JsonConvert.DeserializeObject(response);
                string translatedText = result[0][0][0].ToString();
                return translatedText;
            }
        }
    }
}
