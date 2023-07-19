namespace TrueAccounts.Dto
{
    public class customerLedgerDTO
    {
        public string customerId { get; set; }
        public int branchId { get; set; }
        public DateTime fromDate { get; set; }
        public DateTime toDate { get; set; }
    }
}
