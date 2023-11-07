namespace Sklep.Tools
{
    public class Result<T>
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
        public T ResultValue { get; set; }
    }
}
