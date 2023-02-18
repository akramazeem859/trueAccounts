using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class _6pinvoiceAddAccountId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "accountId",
                table: "PInvoices",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PInvoices_accountId",
                table: "PInvoices",
                column: "accountId");

            migrationBuilder.AddForeignKey(
                name: "FK_PInvoices_CashAccount_accountId",
                table: "PInvoices",
                column: "accountId",
                principalTable: "CashAccount",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PInvoices_CashAccount_accountId",
                table: "PInvoices");

            migrationBuilder.DropIndex(
                name: "IX_PInvoices_accountId",
                table: "PInvoices");

            migrationBuilder.DropColumn(
                name: "accountId",
                table: "PInvoices");
        }
    }
}
