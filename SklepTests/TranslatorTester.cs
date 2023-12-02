using Microsoft.VisualStudio.TestTools.UnitTesting;
using Sklep.Tools;

namespace SklepTests
{
    [TestClass]
    public class TranslatorTester
    {
        [TestMethod]
        [DataRow("This field is required", "To pole jest wymagane", "pl")]
        [DataRow("Invalid data format", "Nieprawidłowy format danych", "pl")]
        public void Translate(string input, string expected, string targetLang)
        {
            var result = Translator.Translate(input, targetLang);

            Assert.AreEqual(expected, result.ResultValue);
        }
    }
}
