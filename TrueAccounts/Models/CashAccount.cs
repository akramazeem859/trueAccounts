namespace TrueAccounts.Models
{
    public class CashAccount
    {
        public int id { get; set; }
        public string accountCode { get; set; }
        public string accountTitle { get; set; }
        public string accountType { get; set; }
        public int accountBalance { get; set; }
        public int accountBranchId { get; set; }
        public Branch accountBranch { get; set; }
    }
}
