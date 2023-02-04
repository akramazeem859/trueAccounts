using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class _4accounts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CashAccount_Branches_BranchId",
                table: "CashAccount");

            migrationBuilder.RenameColumn(
                name: "AccountType",
                table: "CashAccount",
                newName: "accountType");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "CashAccount",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "CashAccount",
                newName: "accountTitle");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "CashAccount",
                newName: "accountCode");

            migrationBuilder.RenameColumn(
                name: "BranchId",
                table: "CashAccount",
                newName: "accountBranchId");

            migrationBuilder.RenameColumn(
                name: "Balance",
                table: "CashAccount",
                newName: "accountBalance");

            migrationBuilder.RenameIndex(
                name: "IX_CashAccount_BranchId",
                table: "CashAccount",
                newName: "IX_CashAccount_accountBranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_CashAccount_Branches_accountBranchId",
                table: "CashAccount",
                column: "accountBranchId",
                principalTable: "Branches",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CashAccount_Branches_accountBranchId",
                table: "CashAccount");

            migrationBuilder.RenameColumn(
                name: "accountType",
                table: "CashAccount",
                newName: "AccountType");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "CashAccount",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "accountTitle",
                table: "CashAccount",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "accountCode",
                table: "CashAccount",
                newName: "Code");

            migrationBuilder.RenameColumn(
                name: "accountBranchId",
                table: "CashAccount",
                newName: "BranchId");

            migrationBuilder.RenameColumn(
                name: "accountBalance",
                table: "CashAccount",
                newName: "Balance");

            migrationBuilder.RenameIndex(
                name: "IX_CashAccount_accountBranchId",
                table: "CashAccount",
                newName: "IX_CashAccount_BranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_CashAccount_Branches_BranchId",
                table: "CashAccount",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
