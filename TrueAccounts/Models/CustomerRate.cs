namespace TrueAccounts.Models
{
    public class CustomerRate
    {
        public int Id { get; set; }
        public int customerId { get; set; }
        public Customer customer { get; set; }
        public int productId { get; set; }
        public Product product { get; set; }
        public int rate { get; set; }
    }
}
