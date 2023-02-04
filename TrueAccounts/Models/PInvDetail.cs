namespace TrueAccounts.Models
{
    public class PInvDetail
    {
        public int id { get; set; }
        public int productId { get; set; }
        public Product product { get; set; }
        public int purchasePrice { get; set; }
        public int quantity { get; set; }
        public int pInvoiceId { get; set; }
        public PInvoice pInvoice { get; set; }

    }
}