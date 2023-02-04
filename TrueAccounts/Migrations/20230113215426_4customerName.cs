using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class _4customerName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customer_Branches_customer_branchid",
                table: "Customer");

            migrationBuilder.DropIndex(
                name: "IX_Customer_customer_branchid",
                table: "Customer");

            migrationBuilder.DropColumn(
                name: "customer_branchid",
                table: "Customer");

            migrationBuilder.RenameColumn(
                name: "customer_Opening_balance",
                table: "Customer",
                newName: "customerOpeningbalance");

            migrationBuilder.RenameColumn(
                name: "customer_Number",
                table: "Customer",
                newName: "customerNumber");

            migrationBuilder.RenameColumn(
                name: "customer_Name",
                table: "Customer",
                newName: "customerName");

            migrationBuilder.RenameColumn(
                name: "customer_Current_balance",
                table: "Customer",
                newName: "customerCurrentbalance");

            migrationBuilder.RenameColumn(
                name: "customer_Code",
                table: "Customer",
                newName: "customerCode");

            migrationBuilder.RenameColumn(
                name: "customer_Branch_Id",
                table: "Customer",
                newName: "customerBranchId");

            migrationBuilder.RenameColumn(
                name: "customer_Address",
                table: "Customer",
                newName: "customerAddress");

            migrationBuilder.CreateIndex(
                name: "IX_Customer_customerBranchId",
                table: "Customer",
                column: "customerBranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customer_Branches_customerBranchId",
                table: "Customer",
                column: "customerBranchId",
                principalTable: "Branches",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customer_Branches_customerBranchId",
                table: "Customer");

            migrationBuilder.DropIndex(
                name: "IX_Customer_customerBranchId",
                table: "Customer");

            migrationBuilder.RenameColumn(
                name: "customerOpeningbalance",
                table: "Customer",
                newName: "customer_Opening_balance");

            migrationBuilder.RenameColumn(
                name: "customerNumber",
                table: "Customer",
                newName: "customer_Number");

            migrationBuilder.RenameColumn(
                name: "customerName",
                table: "Customer",
                newName: "customer_Name");

            migrationBuilder.RenameColumn(
                name: "customerCurrentbalance",
                table: "Customer",
                newName: "customer_Current_balance");

            migrationBuilder.RenameColumn(
                name: "customerCode",
                table: "Customer",
                newName: "customer_Code");

            migrationBuilder.RenameColumn(
                name: "customerBranchId",
                table: "Customer",
                newName: "customer_Branch_Id");

            migrationBuilder.RenameColumn(
                name: "customerAddress",
                table: "Customer",
                newName: "customer_Address");

            migrationBuilder.AddColumn<int>(
                name: "customer_branchid",
                table: "Customer",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Customer_customer_branchid",
                table: "Customer",
                column: "customer_branchid");

            migrationBuilder.AddForeignKey(
                name: "FK_Customer_Branches_customer_branchid",
                table: "Customer",
                column: "customer_branchid",
                principalTable: "Branches",
                principalColumn: "id");
        }
    }
}
