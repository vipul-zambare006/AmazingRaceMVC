namespace DataAccessLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Event",
                c => new
                {
                    Id = c.Guid(nullable: false),
                    EventName = c.String(nullable: false),
                    EventDateTime = c.DateTime(nullable: false),
                    City = c.String(nullable: false),
                })
                .PrimaryKey(t => t.Id);

            CreateTable(
                "dbo.Pitstops",
                c => new
                {
                    Id = c.Guid(nullable: false),
                    Order = c.Int(nullable: false),
                    Location = c.String(),
                    EventId = c.Guid(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Event", t => t.EventId, cascadeDelete: true)
                .Index(t => t.EventId);

            CreateTable(
                "dbo.Team",
                c => new
                {
                    ID = c.Guid(nullable: false),
                    Name = c.String(nullable: false),
                    ImagePath = c.String(nullable: false),
                    EventId = c.Guid(nullable: false),
                })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Event", t => t.EventId, cascadeDelete: true)
                .Index(t => t.EventId);

            CreateTable(
                "dbo.Staff",
                c => new
                {
                    ID = c.Guid(nullable: false),
                    Name = c.String(nullable: false),
                    Location = c.String(nullable: false),
                })
                .PrimaryKey(t => t.ID);
        }

        public override void Down()
        {
            DropForeignKey("dbo.Team", "EventId", "dbo.Event");
            DropForeignKey("dbo.Pitstops", "EventId", "dbo.Event");
            DropIndex("dbo.Team", new[] { "EventId" });
            DropIndex("dbo.Pitstops", new[] { "EventId" });
            DropTable("dbo.Staff");
            DropTable("dbo.Team");
            DropTable("dbo.Pitstops");
            DropTable("dbo.Event");
        }
    }
}
