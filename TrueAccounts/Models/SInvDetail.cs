namespace TrueAccounts.Models
{
    public class SInvDetail
    {
        public int id { get; set; }
        public int productId { get; set; }
        public Product product { get; set; }
        public int salePrice { get; set; }
        public int quantity { get; set; }
        public int sInvoiceId { get; set; }
        public SInvoice sInvoice { get; set; }
    }
}
