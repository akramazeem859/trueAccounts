using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrueAccounts.Migrations
{
    /// <inheritdoc />
    public partial class _4supplier : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Supplier",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    supplierCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    supplierName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    supplierNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    supplierAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    supplierBranchId = table.Column<int>(type: "int", nullable: false),
                    supplierOpeningbalance = table.Column<int>(type: "int", nullable: false),
                    supplierCurrentbalance = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplier", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Supplier_Branches_supplierBranchId",
                        column: x => x.supplierBranchId,
                        principalTable: "Branches",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Supplier_supplierBranchId",
                table: "Supplier",
                column: "supplierBranchId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Supplier");
        }
    }
}
