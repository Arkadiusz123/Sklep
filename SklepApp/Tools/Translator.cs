using System;
using System.Net;
using System.Web;

namespace Sklep.Tools
{
    public class Translator
    {
        public static Result<string> Translate(string text, string targetLanguage)
        {
            string url = $"https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl={targetLanguage}&dt=t&q={HttpUtility.UrlEncode(text)}";

            var operationResult = new Result<string>();

            try
            {
                using (WebClient webClient = new WebClient())
                {
                    string response = webClient.DownloadString(url);
                    dynamic result = Newtonsoft.Json.JsonConvert.DeserializeObject(response);
                    string translatedText = result[0][0][0].ToString();

                    operationResult.Success = true;
                    operationResult.ResultValue = translatedText;
                }

            }
            catch (Exception ex)
            {
                operationResult.Success = false;
                operationResult.ErrorMessage = ex.Message;
            }
            return operationResult;
        }
    }
}
