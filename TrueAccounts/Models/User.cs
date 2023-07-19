namespace TrueAccounts.Models
{
    public class User
    {
        
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string UserName { get; set; }
        public string password { get; set; }
        public string UserCode { get; set; }
        public int? BranchId { get; set; }
        public Branch branch { get; set; }
        public string Designation { get; set; }
        public DateTime? JoiningDate { get; set; }
        public DateTime? Dob { get; set; }
        public bool Status { get; set; }
        public string Token { get; set; }
    }
}
