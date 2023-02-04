using System.ComponentModel.DataAnnotations.Schema;

namespace TrueAccounts.Models
{
    public class Product
    {
        public int id { get; set; }
        public string productName { get; set; }
        public string unit { get; set; }
        public int salePrice { get; set; }
        public int purchasePrice { get; set; }
        public string image { get; set; }
        public int brandId { get; set; }
        public Brand brand { get; set; }

        public List<Inventory> inventory { get; set; }

        

    }
}
