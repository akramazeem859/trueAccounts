namespace TrueAccounts.Models
{
    public class Inventory
    {
        public int id { get; set; }
        public int productId { get; set; }
        public Product product { get; set; }
        public int quantity { get; set; }
        public int branchId { get; set; }
        public Branch branch { get; set; }
    }
}
