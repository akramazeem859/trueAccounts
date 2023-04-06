namespace TrueAccounts.Models
{
    public class JVInvDetail
    {
        public string Id { get; set; }
        public string CoaCode { get; set; }
        public string Particular { get; set; }
        public int Credit { get; set; }
        public int Debit { get; set; }
        public int JvInvId { get; set; }
        public JVInvoice JvInvoice { get; set; }


    }
}
