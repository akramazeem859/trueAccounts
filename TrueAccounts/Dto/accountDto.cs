using TrueAccounts.Models;

namespace TrueAccounts.Dto
{
    public class accountDto
    {
       
        public string accountCode { get; set; }
        public string accountTitle { get; set; }
        public string accountType { get; set; }
        public int accountBalance { get; set; }
        public int accountBranchId { get; set; }
       
    }
}
