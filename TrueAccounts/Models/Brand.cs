namespace TrueAccounts.Models
{
    public class Brand
    {
        public int id { get; set; }
        public string brandName { get; set; }
        public string contactNumber { get; set; }
        public List<Product> products { get; set; }
    }
}
