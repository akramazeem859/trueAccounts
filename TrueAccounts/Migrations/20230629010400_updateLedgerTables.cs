using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class updateLedgerTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SInvoice_customerId",
                table: "SInvoice");

            migrationBuilder.CreateIndex(
                name: "IX_SInvoice_customerId",
                table: "SInvoice",
                column: "customerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SInvoice_customerId",
                table: "SInvoice");

            migrationBuilder.CreateIndex(
                name: "IX_SInvoice_customerId",
                table: "SInvoice",
                column: "customerId",
                unique: true,
                filter: "[customerId] IS NOT NULL");
        }
    }
}
