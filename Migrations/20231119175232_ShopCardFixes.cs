using Microsoft.EntityFrameworkCore.Migrations;

namespace Sklep.Migrations
{
    public partial class ShopCardFixes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ShoppingCardRows_ProductId",
                table: "ShoppingCardRows");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingCardRows_ProductId_ShoppingCardId",
                table: "ShoppingCardRows",
                columns: new[] { "ProductId", "ShoppingCardId" },
                unique: true,
                filter: "[ShoppingCardId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ShoppingCardRows_ProductId_ShoppingCardId",
                table: "ShoppingCardRows");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingCardRows_ProductId",
                table: "ShoppingCardRows",
                column: "ProductId");
        }
    }
}
