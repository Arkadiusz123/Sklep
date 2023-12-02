using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sklep.Migrations
{
    public partial class ShoppingCard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShoppingCards",
                columns: table => new
                {
                    ShoppingCardId = table.Column<string>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingCards", x => x.ShoppingCardId);
                    table.ForeignKey(
                        name: "FK_ShoppingCards_AspNetUsers_ShoppingCardId",
                        column: x => x.ShoppingCardId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShoppingCardRows",
                columns: table => new
                {
                    ShoppingCardRowId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    ShoppingCardId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingCardRows", x => x.ShoppingCardRowId);
                    table.ForeignKey(
                        name: "FK_ShoppingCardRows_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShoppingCardRows_ShoppingCards_ShoppingCardId",
                        column: x => x.ShoppingCardId,
                        principalTable: "ShoppingCards",
                        principalColumn: "ShoppingCardId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingCardRows_ProductId",
                table: "ShoppingCardRows",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingCardRows_ShoppingCardId",
                table: "ShoppingCardRows",
                column: "ShoppingCardId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShoppingCardRows");

            migrationBuilder.DropTable(
                name: "ShoppingCards");
        }
    }
}
