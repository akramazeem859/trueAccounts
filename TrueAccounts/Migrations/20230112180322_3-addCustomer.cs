using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class _3addCustomer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    customerName = table.Column<string>(name: "customer_Name", type: "nvarchar(max)", nullable: true),
                    customerNumber = table.Column<string>(name: "customer_Number", type: "nvarchar(max)", nullable: true),
                    customerAddress = table.Column<string>(name: "customer_Address", type: "nvarchar(max)", nullable: true),
                    customerBranchId = table.Column<int>(name: "customer_Branch_Id", type: "int", nullable: false),
                    customerOpeningbalance = table.Column<int>(name: "customer_Opening_balance", type: "int", nullable: false),
                    customerCurrentbalance = table.Column<int>(name: "customer_Current_balance", type: "int", nullable: false),
                    customerbranchid = table.Column<int>(name: "customer_branchid", type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customer_Branches_customer_branchid",
                        column: x => x.customerbranchid,
                        principalTable: "Branches",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Customer_customer_branchid",
                table: "Customer",
                column: "customer_branchid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customer");
        }
    }
}
