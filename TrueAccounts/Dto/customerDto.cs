using TrueAccounts.Models;

namespace TrueAccounts.Dto
{
    public class customerDto
    {
       
        public string customerCode { get; set; }
        public string customerName { get; set; }
        public string customerNumber { get; set; }
        public string customerAddress { get; set; }
        public int customerBranchId { get; set; }
        public int customerOpeningbalance { get; set; }
        public int customerCurrentbalance { get; set; }
       
    }
}
