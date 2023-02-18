namespace TrueAccounts.Dto
{
    public class saleInvDTO
    {
        public string code { get; set; }
        public int payable { get; set; }
        public int paid { get; set; }
        public int? customerId { get; set; }

        public int freight { get; set; }
        public DateTime datetime { get; set; }
        public int branchId { get; set; }
        public int accountId { get; set; }
        public List<sInvDetailDTO> detail { get; set; }
    }
}
