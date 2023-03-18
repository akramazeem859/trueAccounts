using TrueAccounts.Data;

namespace TrueAccounts.Utility
{
    public static class utilityClass
    {
        private static readonly trueAccountsDbcontext _context;
        static utilityClass()
        {
            //context = trueAccountsDbcontext
            _context = new trueAccountsDbcontext();
        }



        public static string generateCode(string code)
        {
            var coaCount = code + _context.level4
                           .Where(l4 => l4.level3 == code)
                           .Count() + 1.ToString("00");
            return coaCount.ToString();
        }
    }
}
