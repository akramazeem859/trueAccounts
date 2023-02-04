using TrueAccounts.Models;

namespace TrueAccounts.Dto
{
    public class purcInvDTO
    {
       
        public string code { get; set; }
        public int payable { get; set; }
        public int paid { get; set; }
        public int? supplierId { get; set; }
      
        public int freight { get; set; }
        public DateTime datetime { get; set; }
        public int branchId { get; set; }
        public List<pInvDetailDTO> detail { get; set; }

    }
}
