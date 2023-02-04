namespace TrueAccounts.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Branch> branches { get; set; }

    }
}
