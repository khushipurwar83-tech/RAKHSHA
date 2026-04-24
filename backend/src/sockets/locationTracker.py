def register_location_handlers(sio):
    @sio.on("update_location")
    async def handle_update_location(sid, data):
        # data should contain {user_id, latitude, longitude}
        user_id = data.get("user_id")
        if user_id:
            # Broadcast to the tracking room for this user
            # Anyone with the tracking link will be in this room
            await sio.emit("location_changed", {
                "user_id": user_id,
                "latitude": data.get("latitude"),
                "longitude": data.get("longitude"),
                "timestamp": data.get("timestamp")
            }, room=f"track_{user_id}")
            
    @sio.on("start_tracking")
    async def handle_start_tracking(sid, data):
        user_id = data.get("user_id")
        if user_id:
            sio.enter_room(sid, f"track_{user_id}")
            print(f"Sid {sid} started tracking user {user_id}")

    @sio.on("stop_tracking")
    async def handle_stop_tracking(sid, data):
        user_id = data.get("user_id")
        if user_id:
            sio.leave_room(sid, f"track_{user_id}")