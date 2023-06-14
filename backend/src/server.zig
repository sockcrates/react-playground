const c = @cImport({
    @cInclude("shopping_list_server.h");
});

pub fn run_server() !void {
    c.Run_Server(9001);
}
