using TrueAccounts.Models;

namespace TrueAccounts.Dto
{
    public class supplierDto
    {
       
        public string supplierCode { get; set; }
        public string supplierName { get; set; }
        public string supplierNumber { get; set; }
        public string supplierAddress { get; set; }
        public int supplierBranchId { get; set; }
        public int supplierOpeningbalance { get; set; }
        public int supplierCurrentbalance { get; set; }
      
    }
}
