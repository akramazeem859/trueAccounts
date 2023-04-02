namespace TrueAccounts.Models.Repository
{
    public class InvoicRepository
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Particular { get; set; }
        public DateTime DateTime { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public int UserId { get; set; } 
        public DateTime EnterDt { get; set; }
        public string Remarks { get; set; } 


    }
}
